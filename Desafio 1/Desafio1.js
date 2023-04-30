const stringsInicial = ['(){}[]','[{()}](){}','[]{()', '[{)]'];
const characteresEsquerda = ['(', '{', '['];
const characteresDireita = [')', '}', ']'];

stringsInicial.forEach((string) => {
  const stringSplitada = string.split('');
  let stringValida = true;
  let passou = false;
  let resposta = `${string} String é válida!`;

  while(stringSplitada.length !== 0 && stringValida){
    passou = false;

    for (let i = 0; i<stringSplitada.length-1 ; i++){
      for(let index = 0 ; index < 3; index++) {
        if(characteresEsquerda[index] === stringSplitada[i] && characteresDireita[index] === stringSplitada[i+1]){
          stringSplitada.splice(i,2);
          passou = true
        }  
      }
    }

      if(!passou){
        stringValida = false;
        resposta = `${string} não é válida!`;
      }
  }

  console.log(resposta)
});
