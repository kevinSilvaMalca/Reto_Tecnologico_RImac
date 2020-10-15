class peopleModel{
    
    public nombre:String //"name": "Luke Skywalker",
    public altura:String//"height": "172",
    public peso:String        //"mass": "77",
    public cabello:String            //"hair_color": "blond",
    public piel:String        //"skin_color": "fair",
    public ojo:String        //"eye_color": "blue",
    public nacimiento:String        //"birth_year": "19BBY",
    public genero:String        //"gender": "male",
    public natal:String        //"homeworld": "http://swapi.py4e.com/api/planets/1/",
            //"films": [
            //    "http://swapi.py4e.com/api/films/1/",
            //    "http://swapi.py4e.com/api/films/2/",
             //   "http://swapi.py4e.com/api/films/3/",
            //    "http://swapi.py4e.com/api/films/6/",
             //   "http://swapi.py4e.com/api/films/7/"
            //],
            //"species": [
            //    "http://swapi.py4e.com/api/species/1/"
            //],
            //"vehicles": [
            //    "http://swapi.py4e.com/api/vehicles/14/",
            //    "http://swapi.py4e.com/api/vehicles/30/"
            //],
            //"starships": [
             //   "http://swapi.py4e.com/api/starships/12/",
            //    "http://swapi.py4e.com/api/starships/22/"
            //],
    public created:String        //"created": "2014-12-09T13:50:51.644000Z",
    public editad:String        //"edited": "2014-12-20T21:17:56.891000Z",
    public url:String        //"url": "http://swapi.py4e.com/api/people/1/"

    constructor(
        /* nombre:String, 
        altura:String,
        peso:String,       
        cabello:String,           
        piel:String,        
        ojo:String,       
        nacimiento:String,       
        genero:String,      
        natal:String,
        created:String, 
        editad:String,        
        url:String */
    ){
        /* this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.cabello = cabello;
        this.piel = piel;
        this.ojo = ojo;
        this.nacimiento = nacimiento;
        this.genero = genero;
        this.natal = natal;
        this.created = created;
        this.editad = editad;
        this.url = url */
    }       
}

export const Model = new peopleModel();