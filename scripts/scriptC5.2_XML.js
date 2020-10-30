const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const listNode = xmlDOM.querySelector('list');
const studentsNode = listNode.querySelectorAll('student');

let obj = {
    list: []
}

for (let studentNode of studentsNode.values()) {
  const nameNode = studentNode.querySelector('name');
  const firstNameNode = nameNode.querySelector('first');
  const secondNameNode = nameNode.querySelector('second');
  const ageNode = studentNode.querySelector('age');
  const profNode = studentNode.querySelector('prof');
  
  const nameAttrNode = nameNode.getAttribute('lang');
  
  const user = {
        name: firstNameNode.textContent + secondNameNode.textContent,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: nameAttrNode,
  }
  
  obj.list.push(user);
}

console.log(obj);
