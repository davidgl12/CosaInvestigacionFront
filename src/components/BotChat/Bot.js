 import React, { useEffect } from 'react';
import {Widget, addResponseMessage} from 'react-chat-widget';
import { addTweetApi, deleteTweet} from '../../api/tweet';
import useAuth from "../../hooks/useAuth";
import 'react-chat-widget/lib/styles.css';

import botIcon from './bot.svg';

export default function Bot() {
  //Mensaje de inicio
  const user = useAuth();
  useEffect(() => {
    addResponseMessage('¡Hola! ¿En qué te puedo ayudar?');
  },[]);

  //Función que decide qué hacer con el mensaje del usuario (POST a la api)
  const handleMessage = (message) => {
      const mensaje = message.trim()
      if(mensaje.includes('@')){
        manejarFuncion(mensaje);
      }else{
        const request = {question: mensaje};
        const botUrl = "https://proyecto-bot.azurewebsites.net/qnamaker/knowledgebases/0a7c20b7-f544-4d7b-8958-7a73345f1460/generateAnswer"
        console.log({request});

        fetch(`${botUrl}`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `EndpointKey e8557ea1-ec5c-4f9d-9a5c-0f6ff35433e8`
          },
          body: JSON.stringify(request)
        }).then(res => res.json())
          .then(data => {
            console.log({data});
            addResponseMessage(
              data.answers[0].answer.includes('No good match') ? 
              'Lo siento, no te entendí, vuelve a intentarlo' :
              data.answers[0].answer
            )
          });
      }
  }

  const manejarFuncion = (mensaje) => {
    const opcion = mensaje.split(':')[0];
    const texto = mensaje.substring(mensaje.indexOf(':')+1)

    console.log({user});

    switch(opcion){
      case '@tweet': 
        addTweetApi(texto.trim());
        addResponseMessage('Listo, se ha creado el tweet');
        break;
      case '@buscar':
        window.location.replace(`http://localhost:3000/users?page=1&search=${texto.trim()}&type=new`);
        break;
      case '@borrar':
        deleteTweet(user._id, texto.trim());
        addResponseMessage('listo :)');
        break;
    }

    // window.location.reload();
  } 

  return (
      <Widget 
        handleNewUserMessage={handleMessage}
        profileAvatar={botIcon}
        title='¡Hola!'
        subtitle='Pregúntame cualquier duda que tengas 😄'
        senderPlaceHolder='Escribe un mensaje...'
        style={{color: 'black'}}
      />
  );
}
