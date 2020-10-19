Vue.component('checkmark', {
    template: `<img src="../../assets/aimg/check.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('markex', {
    template: `<img src="../../assets/aimg/markex.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('aimg', {
    props: ['file'],
    template: `<img :src="'aimg/'+file" class="img-fluid">`
})



Vue.component('imgbg', {
    props: ['initclass', 'img'],
    template: `
        <div :class="'imgbgMod ' + initclass + ' animate__animated animate__pulse animate__delay-2s'">
            <img :src="img" class="w-100 ">
            <div class="inputs">
                <slot></slot>
            </div>
        </div>
        `
})


Vue.component('navigation', {
    props: ['currentScene', 'scenes'],
    template: `
    <div class="row navigation  text-center">
    <div class="col paginas">
    <div v-for="(i, index) in scenes" :class="'pagina ' + (currentScene == index ? 'iscurrent':'')" @click="$emit('goto', index)"> <span>{{index+1}}</span> </div>
    <div :class="'pagina ' + (scenes.length == currentScene ? 'iscurrent':'')" class="pagina" @click="$emit('goto', scenes.length)"><span>F</span></div>
    </div>
    <div class="col-4 col-md-3">
        <button @click="$emit('back')" :disabled="currentScene == 0">Anterior</button>
        <button @click="$emit('next')" :disabled="currentScene == scenes.length">Siguiente</button>
    </div>

    </div>
    `
})



Vue.component('counter', {
    props: ['resultado'],
    data () {
        return {
            startSeconds: 3600,
            seconds:0,
            secSpeed: 20,
            ended: false,
            started: false
        }
    },
    computed: {
        clockview () {
            let restante = this.startSeconds-this.seconds
            let minutos = Math.floor(restante/60)
            let segundos = 60 - (this.seconds % 60)
            return (minutos<10?'0':'')+minutos + ':' + (segundos<10?'0':'')+segundos
        },
        percentage () { return (this.seconds * 100) / this.startSeconds },
        barstatus () {
            if(this.percentage>50 && this.percentage<75){
                return 'warning'
            } else if(this.percentage>75){
                return 'danger'
            }
        }
    },
    methods: {
        runApp(){
            var runTimer = setInterval(() => {
                this.seconds++
                if(this.seconds == (this.startSeconds)){
                    clearInterval(runTimer)
                    this.ended = true
                    this.$emit('ended')
                }
                if(this.resultado){
                    clearInterval(runTimer)
                }
            }, this.secSpeed)
        },
        startApp(){
            this.runApp()
            this.started = true
            this.$emit('started')
        },
        continueApp(){

        }
    },
    mounted() {
        
    },
    template: `
    <div>
        <div class="row counter justify-content-center align-items-center text-center">
            <div :class="'counterbar'" :style="'width:'+percentage+'%;'"></div>
            <div class="col-md-4 col-6 tiempores"> Tiempo restante: </div>
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="!ended && started"><div class="counter__clock">{{clockview}}</div></div>
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="ended"><div class="counter__clock">00:00</div></div>
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="!started"><div class="counter__clock">60:00</div></div>
        </div>
        <div class="counterRun" v-if="!started">
            <p>Cuentas con <strong>60 minutos</strong> para completar la evaluación.</p>
            <p><small>Guardamos constantemente tus respuestas y tiempos. <br>Si tu conexión se ve interrumpida podrás regresar a completarla con el tiempo que tengas restante.</small></p>
            <p><strong>¡Éxito!</strong></p>
            <button @click="startApp">Comenzar</button>
        </div>
    </div>
    `
})