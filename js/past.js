const {createApp} = Vue 
const app= createApp({
    data() {
        return{
            datosJson: '../data/amazing.json',
            arrEvents:[],
            pastEvents:[],
            categories:[],
            categoriesFiltered:[],
            eventsFiltered:[],
            text:''
        }
    },
    created(){
        this.obtainData()
    },
    methods:{
        async obtainData(){
            await fetch(this.datosJson)
            .then(response=>response.json())
            .then(datosJson=>{
                this.arrEvents=datosJson.events
                this.currentDate=datosJson.currentDate
                this.eventsFiltered=this.obtainPastEvents(this.arrEvents, this.currentDate)
                console.log(this.eventsFiltered);
                this.pastEvents=this.obtainPastEvents(this.arrEvents, this.currentDate)
                this.obtainCategories(this.arrEvents)
                console.log(this.eventsFiltered);
                
                
            })
        },
        obtainPastEvents(array, date){
            let pastEvents=array.filter(element=> new Date(element.date) < new Date(date))
            return pastEvents
        },
        obtainCategories(array){
            array.forEach(element =>{
                if(!this.categories.includes(element.category) && element.category){
                    this.categories.push(element.category)
                }
            })
        }
    },
    computed:{
        categoriesFilter(){
            let firstStep= this.pastEvents.filter(element=> element.name.toLowerCase().includes(this.text.toLowerCase()))
            if(this.categoriesFiltered.length==0){
                this.eventsFiltered = firstStep
            }else{
                this.eventsFiltered= firstStep.filter(element=> this.categoriesFiltered.includes(element.category))
                console.log(this.eventsFiltered);
            }
        }
    }
}).mount('#app')