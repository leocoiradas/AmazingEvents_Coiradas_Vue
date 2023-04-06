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
    created(){},
    methods:{
        async obtainData(){
            await fetch(datosJson)
            .then(response=>response.json())
            .then(datosJson=>{
                this.arrEvents=datosJson.events
                this.currentDate=datosJson.currentDate
                this.eventsFiltered=this.obtainFutureEvents(this.arrEvents, this.currentDate)
            })
        },
        obtainFutureEvents(array, date){
            futureEvents= array.filter(element=> new Date(element.date)>new Date(date))
            return futureEvents
        },
    },
    computed:{}
}).mount('#app')