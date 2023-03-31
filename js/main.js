const { createApp } = Vue
const app = createApp({
    data() {
        return {
            datosJson: '../data/amazing.json',
            arrEvents: [],
            pastEvents: [],
            upcomingEvents: [],
            categories:[],
            eventsFiltered: [],
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
                this.arrCopy= this.arrEvents
                this.obtainCategories(datosJson.events)
            })
        },
        obtainCategories(array){
            array.forEach(element =>{
                if(!this.categories.includes(element.category) && element.category){
                    this.categories.push(element.category)
                }
            })
        }
        
    },
computed: { }
}).mount('#app')