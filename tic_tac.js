class Jogo extends React.Component{

   render (){

     return (
        
       

       <div className="game">


         <div className="game-board">

           <Tabuleiro />

         </div>

       </div>

     );

   }

 }
 


 class Tabuleiro extends React.Component{


   constructor (props){

     super (props);

     this.initialState = {

       quadrados: Array(9).fill(null),

       xIsNext: true

     }
     this.state = this.initialState;

   }



   render (){

     const vencedor = calculateWinner (this.state.quadrados);

     const status = vencedor ? ('Vencedor: ' + vencedor) : ('Jogador: ' + (this.state.xIsNext ? 'X' : 'O'));
     return (


       <div>

         <div>{status}</div>
               
       <div>
          <button className="btn" onClick={()=> this.reset()}>Reiniciar</button>
         
          <button className="btn" onClick={()=> this.autoPlay()}>Jogada</button>
       </div>

         <div className="board-row">

           {this.renderizarQuadrado(0)}

           {this.renderizarQuadrado(1)}

           {this.renderizarQuadrado(2)}

         </div>


         <div className="board-row">

           {this.renderizarQuadrado(3)}

           {this.renderizarQuadrado(4)}

           {this.renderizarQuadrado(5)}

         </div>


         <div className="board-row">

           {this.renderizarQuadrado(6)}

           {this.renderizarQuadrado(7)}

           {this.renderizarQuadrado(8)}

         </div>


       </div>

     );

   }


   renderizarQuadrado (i){

     return (

       <Quadrado 

         value={this.state.quadrados[i]}

         onClick={() => this.handleClick(i)}

       />

     );

   }


   handleClick (i){


     const quadrados = this.state.quadrados.slice();

     if (calculateWinner (quadrados)){

       alert ('Jogo já acabou');

       return;

     }
      
     
     if (quadrados[i]){

       alert ('Quadrado ocupado!')

       return;

     }
     quadrados[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({quadrados: quadrados, xIsNext: !this.state.xIsNext});
    

   }
    
   autoPlay()
   {
     const quadrados = this.state.quadrados.slice();
    

     if (calculateWinner (quadrados)){

       alert ('Jogo já acabou');

       return;

     }
     else
     {
       
              let autoPlayer = false;
              while(!autoPlayer)
              {
                console.log(autoPlayer);
                let autoPlayPosicao = random();
                console.log(autoPlayPosicao);
                console.log(quadrados[autoPlayPosicao]);
                if(!quadrados[autoPlayPosicao])
                {
                   quadrados[autoPlayPosicao] = this.state.xIsNext ? 'X' : 'O';
                   autoPlayer = true;
                                  console.log(autoPlayer);

                   console.log(quadrados);
                   this.setState({quadrados: quadrados, xIsNext: !this.state.xIsNext});   
                }
              }
     
       
       
     }
              
   }
   reset()
   {
    this.setState(this.initialState);
     
   }
 }

 class Quadrado extends React.Component{

   render (){

     return (

       <button

         className="square"

         onClick={this.props.onClick}

       >

         {this.props.value}

       </button>

     );

   }

 }
 

 function calculateWinner (quadrados){

   const lines = [

     [0, 1, 2],

     [3, 4, 5],

     [6, 7, 8],

     [0, 3, 6],

     [1, 4, 7],

     [2, 5, 8],

     [0, 4, 8],

     [2, 4, 6]

   ];

   for (let i = 0; i < lines.length; i++){

     const [a, b, c] = lines[i];

     if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])

       return quadrados[a];

   }

   return null;

 }
 

    
    

  


function random()
{
   let number = Math.floor( 10 * Math.random() - 2);
  
  if(number < 0)
  {
    return 0 ;
  }
  else 
    return number;
  
}

ReactDOM.render(

   <Jogo />,

   document.getElementById ('root')

 );
 


