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
    mounted(){
    },
    template: `
    <div class="row navigation  text-center">
    <div class="col paginas">
    <div v-for="(i, index) in scenes" :class="'pagina ' + (currentScene == index ? 'iscurrent':'') + (i.res?' isok':'') + (i.res==false?' iswrong':'')" @click="$emit('goto', index)"> <span>{{index+1}}</span> </div>
    <div :class="'pagina ' + (scenes.length == currentScene ? 'iscurrent':'')" @click="$emit('goto', scenes.length)"><span>F</span></div>
    </div>
    <div class="col-4 col-md-3">
        <button @click="$emit('back')" :disabled="currentScene == 0">Anterior</button>
        <button @click="$emit('next')" :disabled="currentScene == scenes.length">Siguiente</button>
    </div>

    </div>
    `
})



Vue.component('counter', {
    props: ['resultado', 'currentTime'],
    data () {
        return {
            startSeconds: 3600,
            seconds:0,
            secSpeed: 50,
            ended: false,
            started: false
        }
    },
    computed: {
        clockview () {
            let restante = this.startSeconds-this.seconds
            let minutos = Math.floor(restante/60)
            let segundos = 60 - (this.seconds % 60)
            if(segundos == 60) {
                segundos = 0
            }
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
    watch: {
        currentTime (ov, nv) {
            this.seconds = this.currentTime
        }
    },
    methods: {
        runApp(){
            var runTimer = setInterval(() => {
                this.seconds++
                this.$emit('settime', this.seconds)
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
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="!ended && percentage>0"><div class="counter__clock">{{clockview}}</div></div>
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="ended"><div class="counter__clock">00:00</div></div>
            <div :class="'col-md-4 col-6 ' + barstatus " v-if="percentage==0"><div class="counter__clock">60:00</div></div>
        </div>
        <div class="counterRun" v-if="!started && currentTime==0">
            <p>Tendrás <strong>60 minutos</strong> para completar la evaluación a partir de que des clic en el botón "comenzar".</p>
            <p><small>Podrás cambiar de pregunta utilizando los botones <strong>Anterior</strong> y <strong>Siguiente</strong> o dando clic en los botones numéricos que se encuentran en la parte inferior.</small></p>
            <div class="row navigation  text-center">
                <div class="col paginas">
                    <div class="pagina">1</div><div class="pagina">2</div><div class="pagina">3</div>
                    <div class="pagina">4</div><div class="pagina">5</div><div class="pagina">6</div>
                </div>
                <div class="col-4"><button>Anterior</button> <button>Siguiente</button> </div>
            </div>
            <p class="mt-4"><small>Para responder algunas de las preguntas deberás consultar una imagen o texto de referencia, podrás consultarla dando clic en la imagen que se encuentra en la esquina superior derecha.</small></p>
            <div class="popper">
                <div class="popper__opener animate__animated animate__pulse animate__infinite animate__slower">
                    <div class="popper__hand animate__animated animate__pulse animate__infinite"></div>
                </div>
            </div>
            
            <!--
                <p><small>Guardamos constantemente tus respuestas y tiempos. <br>Si tu conexión se ve interrumpida podrás regresar a completarla con el tiempo que tengas restante.</small></p>
            -->
            <p class="mt-5"><strong>¡Éxito!</strong></p>
            <button @click="startApp">Comenzar</button>
        </div>
        <div class="counterRun" v-if="!started && currentTime!=0">
            <p>¡Continúa con tu evaluación!</p>
            <p>Aún tienes un tiempo restante de <strong>{{clockview}}</strong>.</p>
            <p><strong>¡Éxito!</strong></p>
            <button @click="startApp">Continuar</button>
        </div>
        <div class="counterRun endtime" v-if="percentage==100">
            <p><strong>Tu tiempo se terminó.</strong></p>
            <p>Se ha entregado tu evaluación con las respuestas que llevabas hasta el momento.</p>
        </div>
    </div>
    `
})