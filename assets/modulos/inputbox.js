Vue.component('inputbox', {
    props: ['value', 'text', 'answer', 'num', 'type', 'placeh', 'textarea', 'caseSensitive'],
    data() {
        return {
            status: "",
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
        inputed () {
            if(this.evaluate) {
                return false
            }
            this.$emit('input', this.status)
            if(this.status) {
                s_ok.play()
            } else {
                s_error.play()
            }
        },
        verify () { 
            this.evaluate = true
            var theanswer = this.answer
            let userAnswer = this.status
            
            if(this.type == 'text' && this.caseSensitive==undefined){
                theanswer = theanswer.toString().toLowerCase()
                userAnswer = userAnswer.toLowerCase().trim()
                
                if(userAnswer.length>3){
                    userAnswer = userAnswer.replace(/\.$/, "")
                }

            }
            
            if(userAnswer == theanswer) {
                this.$emit('isright', true)
                this.result = true
            }
        }
    },
    mounted () {
        this.$emit('input', "")
    },
    template: `
        <div class="inputbox" :class="setclass">
            <slot name="before"></slot>
            <input v-model="status" :placeholder="placeh" :type="type" @input="inputed" :disabled="evaluate" v-if="textarea==undefined" />
            <textarea v-model="status" :placeholder="placeh" @input="inputed" :disabled="evaluate" v-if="textarea!=undefined"></textarea>
            <slot name="after"></slot>
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
        </div>
    `
})


/*
inputbox(v-model="r[0]" :ref="refCount()" @isright="right++" answer="v" type="text" placeh="-")

<inputbox v-model="r[0]" :ref="refCount()" @isright="right++" answer="txt" type="text" placeh="-"></inputbox>
<inputbox v-model="r[0]" :ref="refCount()" @isright="right++" :answer="90" type="number" placeh="#"></inputbox>

<inputbox v-model="r[index]" :ref="refCount()" @isright="right++" :answer="90" type="number" placeh="#"></inputbox>
*/