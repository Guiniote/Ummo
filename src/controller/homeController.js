const fetch = require('node-fetch');

//Declaro array con todo el equipo porque no puedo buscar por clan en la API.
const ummo = [  
                '76561198085027156',
                '76561199036905092',
                '76561198802370760',
                '76561198116803670',
                '76561199042180803',
                '76561199044452511',
                '76561198263362780',
                '76561199037568260',
                '76561198085177306',
                '76561198320937657',
                '76561199038971109',
                '76561199036609735',
                '76561198064439895'
            ];


let homeController = {
    show: (req, res) => {
        res.render('home');
    },

    //Lista de ranking 1v1
    list1V1: async (req, res) => {
        try {

            //Declaro variable api con el endpoint a utilizar y array de retorno a la vista
            const api = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&count=1&steam_id='
            let todos = [];

            //Bucle para llamar a la api con el miembro de ummo correspondiente
            for (let i = 0; i<ummo.length; i++) {
                let buscador = api+ummo[i];                                             //Armo el endpoint completo
                let manco = await fetch(buscador).then(response => response.json())     //Llamo a la api
                manco = manco.leaderboard;                                              //Guardo el dato concreto del jugador en la misma variable de llamada
                todos = todos.concat(manco);                                            //Concateno el resultado del jugador en el array de retorno
                
                todos.sort(function (b, a) {                                            //Ordeno el array para tener el leaderboard
                    if (a.rating > b.rating) {
                      return 1;
                    }
                    if (a.rating < b.rating) {
                      return -1;
                    }
                    return 0;
                });
                
            }
            
            return res.render('list1V1', { todos });                                    //Retorno a la vista

        } catch (error) {
            return res.send(error);
        }
        
    }, 

    //Lista de ranking TG
    listTG: async (req, res) => {
        try {

            //Declaro variable api con el endpoint a utilizar y array de retorno a la vista
            let api = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=4&count=1&steam_id='
            let todos = [];

            //Bucle para llamar a la api con el miembro de ummo correspondiente
            for (let i = 0; i<ummo.length; i++) {
                let buscador = api+ummo[i];                                             
                let manco = await fetch(buscador).then(response => response.json())     
                manco = manco.leaderboard;                                              
                todos = todos.concat(manco);                                            
                
                todos.sort(function (b, a) {                                            
                    if (a.rating > b.rating) {
                      return 1;
                    }
                    if (a.rating < b.rating) {
                      return -1;
                    }
                    return 0;
                });
                
            }
            
            return res.render('listTG', { todos });                                     

        } catch (error) {
            return res.send(error);
        }
        
    }, 

    //Lista de ranking no rankeado
    listUR: async (req, res) => {
        try {

            //Declaro variable api con el endpoint a utilizar y array de retorno a la vista
            let api = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=0&count=1&steam_id='
            let todos = [];

            //Bucle para llamar a la api con el miembro de ummo correspondiente
            for (let i = 0; i<ummo.length; i++) {
                let buscador = api+ummo[i];                                             
                let manco = await fetch(buscador).then(response => response.json())     
                manco = manco.leaderboard;                                              
                todos = todos.concat(manco);                                            
                
                todos.sort(function (b, a) {
                    if (a.rating > b.rating) {
                      return 1;
                    }
                    if (a.rating < b.rating) {
                      return -1;
                    }
                    return 0;
                });
                
            }
            
            return res.render('listUR', { todos });

        } catch (error) {
            return res.send(error);
        }
        
    }
}

module.exports = homeController;