const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()
suite('Unit Tests', () => {
  suite('American to british', () => {
    let locale = 'american-to-british'
    test('Translate Mangoes are my favorite fruit. to British English', function () {
      assert.equal(translator.changeWords('Mangoes are my favorite fruit.', locale)[0], 'Mangoes are my favourite fruit.')
    })
    test('Translate I ate yogurt for breakfast. to British English', function () {
      assert.equal(translator.changeWords('I ate yogurt for breakfast.', locale)[0], 'I ate yoghurt for breakfast.')
    })
    test('Translate We had a party at my friend\'s condo. to British English', function () {
      assert.equal(translator.changeWords('We had a party at my friend\'s condo.', locale)[0], 'We had a party at my friend\'s flat.')
    })
    test('Translate Can you toss this in the trashcan for me? to British English', function () {
      assert.equal(translator.changeWords('Can you toss this in the trashcan for me?', locale)[0], 'Can you toss this in the bin for me?')
    })
    test('Translate The parking lot was full. to British English', function () {
      assert.equal(translator.changeWords('The parking lot was full.', locale)[0], 'The car park was full.')
    })

    test('Translate Like a high tech Rube Goldberg machine. to British English', function () {
      assert.equal(translator.changeWords('Like a high tech Rube Goldberg machine.', locale)[0], 'Like a high tech Heath Robinson device.')
    })
    test('Translate To play hooky means to skip class or work. to British English', function () {
      assert.equal(translator.changeWords('To play hooky means to skip class or work.', locale)[0], 'To bunk off means to skip class or work.')
    })
    test('Translate No Mr. Bond, I expect you to die. to British English', function () {
      assert.equal(translator.changeWords('No Mr. Bond, I expect you to die.', locale)[0], 'No Mr Bond, I expect you to die.')
    })
    test('Translate Dr. Grosh will see you now. to British English', function () {
      assert.equal(translator.changeWords('Dr. Grosh will see you now.', locale)[0], 'Dr Grosh will see you now.')
    })
    test('Translate Lunch is at 12:15 today. to British English', function () {
      assert.equal(translator.changeWords('Lunch is at 12:15 today.', locale)[0], 'Lunch is at 12.15 today.')
    })
  })
  suite('British to american', () => {
    let locale = 'british-to-american'
    test('Translate We watched the footie match for a while. to American English', function () {
      assert.equal(translator.changeWords('We watched the footie match for a while.', locale)[0], 'We watched the soccer match for a while.')
    })
    test('Translate Paracetamol takes up to an hour to work. to American English', function () {
      assert.equal(translator.changeWords('Paracetamol takes up to an hour to work.', locale)[0], 'Tylenol takes up to an hour to work.')
    })
    test('Translate First, caramelise the onions. to American English', function () {
      assert.equal(translator.changeWords('First, caramelise the onions.', locale)[0], 'First, caramelize the onions.')
    })
    test('Translate I spent the bank holiday at the funfair. to American English', function () {
      assert.equal(translator.changeWords('I spent the bank holiday at the funfair.', locale)[0], 'I spent the public holiday at the carnival.')
    })
    test('Translate I had a bicky then went to the chippy. to American English', function () {
      assert.equal(translator.changeWords('I had a bicky then went to the chippy.', locale)[0], 'I had a cookie then went to the fish-and-chip shop.')
    })
    test('Translate I\'ve just got bits and bobs in my bum bag. to American English', function () {
      assert.equal(translator.changeWords('I\'ve just got bits and bobs in my bum bag.', locale)[0], 'I\'ve just got odds and ends in my fanny pack.')
    })
    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function () {
      assert.equal(translator.changeWords('The car boot sale at Boxted Airfield was called off.', locale)[0], 'The swap meet at Boxted Airfield was called off.')
    })
    test('Translate Have you met Mrs Kalyani? to American English', function () {
      assert.equal(translator.changeWords('Have you met Mrs Kalyani?', locale)[0], 'Have you met Mrs. Kalyani?')
    })
    test('Translate Prof Joyner of King\'s College, London. to American English', function () {
      assert.equal(translator.changeWords('Prof Joyner of King\'s College, London.', locale)[0], 'Prof. Joyner of King\'s College, London.')
    })
    test('Translate Tea time is usually around 4 or 4.30. to American English', function () {
      assert.equal(translator.changeWords('Tea time is usually around 4 or 4.30.', locale)[0], 'Tea time is usually around 4 or 4:30.')
    })
  })
  suite('Highlight translations', () => {
    let locale = 'american-to-british'
    test('Highlight translation in Mangoes are my favorite fruit.', function () {
      assert.equal(translator.translate('Mangoes are my favorite fruit.', locale), 'Mangoes are my <span class="highlight">favourite</span> fruit.')
    })
    test('Highlight translation in I ate yogurt for breakfast.', function () {
      assert.equal(translator.translate('I ate yogurt for breakfast.', locale), 'I ate <span class="highlight">yoghurt</span> for breakfast.')
    })
    test('Highlight translation in I ate yogurt for breakfast.', function () {
      locale = 'british-to-american'
      assert.equal(translator.translate('We watched the footie match for a while.', locale), 'We watched the <span class="highlight">soccer</span> match for a while.')
    })
    test('Highlight translation in Paracetamol takes up to an hour to work.', function () {
      locale = 'british-to-american'
      assert.equal(translator.translate('Paracetamol takes up to an hour to work.', locale), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
    })
  })

});
