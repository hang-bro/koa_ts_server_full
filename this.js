function fnCall(...p) {
  console.log(`p ==>`, p);
  console.log(`this ==>`, this);
  console.log(`arguments ==>`, arguments);
}
fnCall.call({ name: 'fnCall' }, '2333', 1, 2)



function fnApply(...p) {
  console.log(`p ==>`, p);
  console.log(`this ==>`, this);
  console.log(`arguments ==>`, arguments);
}
fnApply.apply({ name: 'fnApply' }, ['2333',0,null,undefined,{},false],)


function fnBind(...p) {
  console.log(`p ==>`, p);
  console.log(`this ==>`, this);
  console.log(`arguments ==>`, arguments);
}


fnBind.bind({name:'fnBind'},123,true,false,null)()