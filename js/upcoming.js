const {createApp} = Vue 
const app = createApp({
    data(){
        return{
            datosJson:'../data/amazing.json',
            arrEvents:[],
            futureEvents:[],
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
                this.eventsFiltered=this.obtainFutureEvents(this.arrEvents, this.currentDate)
                this.futureEvents= this.obtainFutureEvents(this.arrEvents, this.currentDate)
                this.obtainCategories(this.arrEvents)
            })
        },
        obtainFutureEvents(array, date){
            futureEvents= array.filter(element=> new Date(element.date)>new Date(date))
            return futureEvents
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
            let firstStep= this.futureEvents.filter(element=> element.name.toLowerCase().includes(this.text.toLowerCase()))
            if(this.categoriesFiltered.length==0){
                this.eventsFiltered = firstStep
            }else{
                this.eventsFiltered= firstStep.filter(element=> this.categoriesFiltered.includes(element.category))
                console.log(this.eventsFiltered);
            }
        }
    }
}).mount('#app')