Vue.component('inputbox', {
    props: ['value', 'text', 'answer', 'num', 'type', 'placeh', 'textarea', 'caseSensitive'],
    data() {
        return {
            status: [],
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
            s_ok.play()
        },
        verify () { 
            this.evaluate = true


            const theanswer = this.type=='text' ? this.answer.map(item => item.toLowerCase().trim()) : this.answer
            const userAnswer = this.type=='text' ? this.status.map(item => item.toLowerCase().trim()) : this.status
            console.log(userAnswer)

            /*
            if(this.type == 'text' && this.caseSensitive==undefined){
                theanswer = theanswer.toString().toLowerCase()
                userAnswer = userAnswer.toLowerCase().trim()
                
                if(userAnswer.length>3){
                    userAnswer = userAnswer.replace(/\.$/, "")
                }
            }
            */
            if(_.isEqual(theanswer.sort(), userAnswer.sort())){            
                this.$emit('isright', true)
                this.result = true
            }
        }
    },
    mounted () {
        this.$emit('input', "")
    },
    template: `
        <div class="inputboxes">
            <div class="inputbox" :class="setclass" v-for="(i, index) in answer">
                <input v-model="status[index]" :placeholder="placeh" :type="type" @input="inputed" :disabled="evaluate" />
                <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            </div>
        </div>
    `
})


/*
inputbox(v-model="r[0]" :ref="refCount()" @isright="right++" answer="v" type="text" placeh="-")

<inputbox v-model="r[0]" :ref="refCount()" @isright="right++" answer="txt" type="text" placeh="-"></inputbox>
<inputbox v-model="r[0]" :ref="refCount()" @isright="right++" :answer="90" type="number" placeh="#"></inputbox>

<inputbox v-model="r[index]" :ref="refCount()" @isright="right++" :answer="90" type="number" placeh="#"></inputbox>
*/