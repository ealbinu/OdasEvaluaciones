Vue.component('choose', {
    props: ['value', 'text', 'options', 'answer', 'num', 'isactive'],
    data() {
        return {
            status: null,
            evaluate: false,
            result: false
        }
    },
    computed:{
        setclass () {
            if(this.evaluate) {
                return this.result ? 'isright':'iswrong'
            } else {
                return ''
            }
        }
    },
    methods: {
        clicked (op) {
            if(this.evaluate) {
                return false
            }
            this.status = op
            this.$emit('input', this.status)
            if(this.status) {
                s_ok.play()
            }
        },
        verify () { 
            this.evaluate = true
            if(this.status == this.answer) {
                this.$emit('isright', true)
                this.result = true
            } else {
                this.$emit('iswrong')
            }
        }
    },
    mounted () {
        this.$emit('input', null)
        if(this.value !== null){
            this.status = this.value
            this.$emit('input', this.status)
        }
    },
    template: `
        <div class="choose" :class="setclass">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            <div class="label"><strong v-if="num">{{num}}</strong> <span v-html="text"></span></div>
            <div class="options">
                <template v-for="(op, index) in options">  
                    <div @click="clicked(index)" v-if="status!=index" v-html="op" :class="isactive ? 'animate__animated animate__bounce animate__fast':''"></div>
                    <div @click="clicked(index)" v-if="status==index" class="active animate__animated animate__rubberBand" v-html="op"></div>
                </template>
            </div>
        </div>
    `
})

/*
<choose v-model="r[4]" :ref="refCount()" num="1." text="El vestido de la niña es:" :options="['rojo', 'amarillo', 'azul']" @isright="right++" answer="amarillo"></choose>
*/