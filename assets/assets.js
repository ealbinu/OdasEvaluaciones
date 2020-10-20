/* AUDIOS */
var s_end = new Howl({ src: ['../../assets/asound/end.mp3'] });
var s_error = new Howl({ src: ['../../assets/asound/error.mp3'] });
var s_ok = new Howl({ src: ['../../assets/asound/ok.mp3'] });
var s_select = new Howl({ src: ['../../assets/asound/select.mp3'] });
var s_win = new Howl({ src: ['../../assets/asound/win.mp3'] });

var counterRef = 0


/* ################ */
/* VUE INIT */
var app = new Vue({
    el: '#app',
    data () {
        return {
            r: [],
            right: 0,
            total: 0,
            resultado: false,
            scenes: {},
            currentScene:0,
            temps: {},
            finalData:{
                score: 0,
                scoresum: 0,
                oks: 0,
                errors: 0,
                answers: 0,
                screen: []
            },
            screen: [],
            started: false,
            currentTime: 0,
        }
    },
    watch: {
        r: {
            deep: true,
            handler(){
                this.buildStoreCall()
            }
        }
    },
    methods: {
        buildStoreCall () {
                let time = this.currentTime + '/'
                let arra = []
                for(i in this.r){
                    if(this.r[i] == null ) {
                        arra.push(-1)
                    } else {
                        arra.push(this.r[i])
                    }
                }
                let arrayt = '[' + arra.toString() + ']' + '/'
                let stringr = time + arrayt + this.currentScene
                console.log(stringr)
                let stringr64 = window.btoa(stringr)
                window.location.hash = '#d'+stringr64
        },
        refCount($e){
            let ct = 'rf_'+counterRef
            counterRef = counterRef+1
            return ct
        },
        reset () { location.reload() },
        finalizar () {
            s_win.play()
            this.total = this.r.length
            for(var i in this.$refs){
                if(this.$refs[i]!=undefined){
                    if(Array.isArray(this.$refs[i])){
                        if(this.$refs[i][0]!=undefined){
                            this.$refs[i][0].verify()
                        }
                    } else {
                        this.$refs[i].verify()
                    }
                }
            }
            this.resultado = true
            /* screenshot */
            var _this = this
            domtoimage.toPng(document.body).then(function (dataUrl) {
                _this.screen.push(dataUrl)
                _this.ended()
            }).catch(function (error) { console.error(error) })
            //this.ended()
        },
        ended () {
            var _this = this
            _this.finalData.scoresum = (_this.finalData.score / _this.total) * _this.right
            _this.finalData.oks = _this.right
            _this.finalData.errors = _this.total-_this.right
            _this.finalData.answers = _this.total
            _this.finalData.screen = _this.screen
            var endData = JSON.stringify(_this.finalData)
            window.top.postMessage(endData, "*")
        },
        loadScreencap(){
            var s = document.createElement("script")
            s.type = "text/javascript"
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"
            document.head.appendChild(s)

        },
        loadDataAndContinue(){
            let hash = window.location.hash ? window.location.hash.replace('#d', '') : null
            if(hash){
                hash = window.atob(hash)
                hash = hash.split('/')
                /* Time */
                var time = parseInt(hash[0])
                /* Answers */
                let data = JSON.parse(hash[1])

                /* set time and data */
                for(d in data){ if(data[d] !== null){ this.r[d] = data[d] } else { this.r[d] = null }}
                this.currentTime = time
                /*RECORDAR PAGINA */
                this.$set(this, 'currentScene', parseInt(hash[2]) )
                console.log(this.currentScene)
            }
        }

    },
    mounted () {
        var h = parseInt(window.location.hash ? window.location.hash.replace('#s', '') : 100)
        
        //this.finalData.score = h ? h : 100

        /* Screen capture */
        this.loadScreencap()

        this.loadDataAndContinue()
    }
})


