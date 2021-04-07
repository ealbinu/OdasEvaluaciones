Vue.component('check', {
    props: ['value', 'text', 'answer', 'num'],
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
        clicked (index) {
            if(this.evaluate) {
                return false
            }
            this.status[index] = !this.status[index]
            this.$emit('input', this.status)
            /*
            if(this.status) {
                s_ok.play()
            } else {
                s_error.play()
            }
            */
        },
        verify () { 
            this.evaluate = true
            var allareright = true
            for(var index in this.answer){
                if(this.status[index] != this.answer[index]) {
                    allareright = false
                }
            }
            if(allareright){
                this.$emit('isright', true)
                this.result = true
                console.log('ALLRIGHT')
            }
        }
    },
    mounted () {
        for(var index in this.answer){
            this.status[index] = false
        }
        this.$emit('input', false)
    },
    template: `
        <div class="checks">
            <div v-for="(i, index) in answer">

                    <div class="check" :class="setclass + ' ' + (status[index] ? 'activecheck':'') ">
                    
                    <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
                    
                        <!--<div class="label"><strong v-if="num.length && num[index]">{{num[index]}}</strong></div>-->

                        <div class="checkbox" @click="clicked(index)">
                            <img v-if="status[index]" src="../../assets/aimg/check.svg" class="animate__animated animate__heartBeat">
                        </div>
                        <div class="label checktext" @click="clicked(index)" v-html="text[index]"></div>
                        
                    </div>

            </div>
        </div>
    `
})

/*
 <check v-model="r[4]" ref="q4" num="1." @isright="right++" :answer="false" text="Figurillas de arcilla" />
 <check v-model="r[index]" :ref="'q'+index"  @isright="right++" :answer="i.val" :text="i.text" />
*/