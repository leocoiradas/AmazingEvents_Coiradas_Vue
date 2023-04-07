const { createApp } = Vue
const app = createApp({
    data() {
        return {
            datosJson: '../data/amazing.json',
            arrEvents: [],
            categories:[],
            eventsFiltered: [],
            categoriesFiltered:[],
            text: ''
        }
    },
    created() { 
        this.obtainData()
        
    },
    methods: {
        async obtainData() {
            await fetch(this.datosJson)
            .then(response=>response.json())
            .then(datosJson=>{
                this.arrEvents=datosJson.events
                this.eventsFiltered= this.arrEvents
                
                this.obtainCategories(datosJson.events)
            }).catch(error => console.log(error.message))
        },
        obtainCategories(array){
            array.forEach(element =>{
                if(!this.categories.includes(element.category) && element.category){
                    this.categories.push(element.category)
                }
            })
        }
        
    },
computed: { 
    categoriesFilter(){
        let firstStep= this.arrEvents.filter(element=> element.name.toLowerCase().includes(this.text.toLowerCase()))
        if(this.categoriesFiltered.length==0){
            this.eventsFiltered = firstStep
        }else{
            this.eventsFiltered= firstStep.filter(element=> this.categoriesFiltered.includes(element.category))
            console.log(this.eventsFiltered);
        }
    }
}
}).mount('#app')