# Spacy for Node.js

This library exposes the `parse` method of [SpaCy](https://spacy.io) to Node.js.

With this library, you can easily parse text in Node.js with SpaCy's industry-leading accuracy.

## Installation

To install this library, simply run:

```
npm install --save spacy-nlp-node
```

And if needed navigate to the library folder and install the requirements.txt by running:

Use pip, or pip3 which is available.

```
pip install -r requirements.txt
```

## Usage

To use this library, simply require it and call the `parse` method:

javascript

```
import { parse, isReady } from "spacy-nlp-node";
```

```
var text = 'This is some text to parse.';

try {
const result = await parse({ text: text, TimeoutLimit: 1000 * 60 });
//Do something with the result
} catch (error) {
//Do something with the error, it could be {error: "No response received, Time out"}
}
```

The `parse` method returns a object from SpaCy.
Example:

```
{
text: "",
ents: [{ start: 0, end: 0, label: "" }],
sents: [{ start: 0, end: 0 }],
tokens: [
{
id: 0,
start: 0,
end: 0,
tag: "",
pos: "",
morph: "",
lemma: "",
dep: "",
head: 0,
},
],
}
```

## Models

The model used in this library "for now" is "en_core_web_trf", Will be adding more models to it soon if someone asked for it.

## Help
If there is anything that needs fixing or edited, please open an issue. You may also make a feature request.

## License

This library is released under the MIT license.
