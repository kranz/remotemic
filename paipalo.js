getName=(person)=>person.name;

uppercase = (string) => string.toUpperCase();

get6Characters = (string) => string.substring(0,6);

reverse =(string) => string.split('').reverse().join('');

pipe = (...functions) => (value) => {
  return functions.reduce((currentValue, currentFunction) => {
    return currentFunction(currentValue);
  }, value);
};


pipe(
	getName,
	uppercase,
	get6Characters,
	reverse
	)({name: 'Testadicazzo'});