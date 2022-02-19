const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        let [translated, words] = this.changeWords(text, locale)
        return this.highlight(translated, words)

    }
    highlight(text, words) {
        words.map(word => {
            let lightedWord = `<span class="highlight">${word}</span>`
            text = text.replace(word, lightedWord)
        })
        return text
    }
    changeWords(text, locale) {

        let changedWords = []
        let splitedText = text.split(' ')
        if (locale == 'american-to-british') {
            for (let word of splitedText) {
                if (americanToBritishSpelling[word]) {
                    changedWords.push(americanToBritishSpelling[word])
                    text = text.replace(word, americanToBritishSpelling[word])
                }
            }
            for (let i = 4; i >= 1; i--) {
                let currentwords = (Object.keys(americanOnly).filter(word => word.split(' ').length == i))
                currentwords.sort((a, b) => b.length - a.length);
                for (let word of currentwords) {
                    let re = `${word}`
                    re = new RegExp(re, 'ig')
                    if (text.match(re)) changedWords.push(americanOnly[word])
                    text = text.replace(re, americanOnly[word])
                }
            }
            for (let word of splitedText) {
                let re = `${word}`
                re = new RegExp(re, 'i')
                if (word.toLowerCase() in americanToBritishTitles) {
                    word = word.toLowerCase()
                    let newTxt = americanToBritishTitles[word][0].toUpperCase() + americanToBritishTitles[word].slice(1)
                    changedWords.push(newTxt)
                    text = text.replace(re, newTxt)
                }
            }
            let numberRE = /([0-9]{1,2})(:)([0-9]{2})/ig
            let match = numberRE.exec(text)
            if (match) changedWords.push(match[1]+'.'+match[3])
            text = text.replace(numberRE, '$1.$3')
            return [text, changedWords]

        } else if (locale == 'british-to-american') {
            let britishToAmericanSpelling = {}
            Object.keys(americanToBritishSpelling).forEach(key => {
                britishToAmericanSpelling[americanToBritishSpelling[key]] = key;
            });
            for (let word of splitedText) {
                if (britishToAmericanSpelling[word]) {
                    changedWords.push(britishToAmericanSpelling[word])
                    text = text.replace(word, britishToAmericanSpelling[word])
                }
            }
            for (let i = 3; i >= 2; i--) {
                let currentwords = (Object.keys(britishOnly).filter(word => word.split(' ').length == i))
                currentwords.sort((a, b) => b.length - a.length);
                for (let word of currentwords) {
                    let re = `${word}`
                    re = new RegExp(re, 'ig')
                    text = text.replace(re, britishOnly[word])
                    if (text.match(re)) changedWords.push(britishOnly[word])
                }
            }
            let currentWords = (Object.keys(britishOnly).filter(word => word.split(' ').length == 1))
            currentWords.sort((a, b) => b.length - a.length);
            for (let word of splitedText) {
                word = word.match(/\w+/i)[0]
                if (currentWords.indexOf(word.toLowerCase()) != -1) {
                    changedWords.push(britishOnly[word.toLowerCase()])
                    text = text.replace(word, britishOnly[word.toLowerCase()])
                } 
            }

            let britishToAmericanTitles = {}
            Object.keys(americanToBritishTitles).forEach(key => {
                britishToAmericanTitles[americanToBritishTitles[key]] = key;
            });
            for (let word of splitedText) {
                let re = `${word}`
                re = new RegExp(re, 'i')
                if (word.toLowerCase() in britishToAmericanTitles) {
                    word = word.toLowerCase()
                    let newTxt = britishToAmericanTitles[word][0].toUpperCase() + britishToAmericanTitles[word].slice(1)
                    changedWords.push(newTxt)
                    text = text.replace(re, newTxt)
                }
            }

            let numberRE = /([0-9]{1,2})(.)([0-9]{2})/ig
            let match = numberRE.exec(text)
            if (match) changedWords.push(match[1]+':'+match[3])
            text = text.replace(numberRE, '$1:$3')

            return [text, changedWords]
        }
    }
}
let tlr = new Translator()
tlr.translate('10:30', 'american-to-british')
module.exports = Translator;