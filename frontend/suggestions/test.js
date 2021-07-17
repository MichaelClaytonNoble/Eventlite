
class Event{
  constructor(category, paid, location){
    this.category = category;
    this.paid = paid;
    this.location = location; 
  }
}

class Tree {
  constructor(){
    this.root = new Node();
    this.children=[];
  }

  addEvent(event){

    let attributes = [
      ["category",event.category], ["location",event.location], ["paid",event.paid]
    ];

    const dfs = (node = this.root) => {
      if( !attributes.length ) return; 

      let attribute = attributes.pop(); 
      let key = attribute[0];
      let val = attribute[1];
  
      if( node.catalog[val] !== undefined){
        let index = node.catalog[val]; 
        dfs(node.children[index]);
      }
      else{
        let newNode = new Node(key, val);
        node.children.push(newNode); 
        let index = node.children.length - 1;
        node.catalog[val] = index;
        dfs(newNode); 
      }
    }; 
    dfs(); 

  }
  print(){

    const dfs = (node = this.root) => {

      console.log( "Type: ", node.type, "Value: ", node.val);
      console.log(node.catalog); 
      if( !node.children.length){
        return;
      }
    
      while( node.children.length ){
        let current = node.children.pop(); 
        dfs(current); 
      }
    }

    dfs();
  }
  printChildren(node){

    for(let i = 0; i<node.children.length; i++){
      console.log( `Child${i}`, " Type:", node.children[i].type, " Value:", node.children[i].val)
    }
  }
}

class Node{
  constructor(type, val){
    this.catalog = {};
    this.val = val;
    this.type = type;
    this.children = [];
  }
}
function main(){
  let events = [];
  events[0] = new Event("Music", "true", "ONLINE");
  events[1] = new Event("Health", "true", "ONLINE");
  events[2] = new Event("Food & Drink", "true", "ONLINE");
  events[3] = new Event("Music", "false", "ONLINE");
  events[4] = new Event("Health", "false", "ONLINE");
  events[5] = new Event("Food & Drink", "false", "ONLINE");
  events[6] = new Event("Science & Tech", "true", "VENUE");
  events[7] = new Event("Film & Media", "false", "VENUE");
  events[8] = new Event("Community", "true", "VENUE");

  let tree = new Tree(); 
  for(let i = 0; i<events.length; i++){
    tree.addEvent(events[i]);
  }


  // tree.printChildren(tree.root); 
  // tree.printChildren(tree.root.children[0]);
  // tree.printChildren(tree.root.children[0].children[0]);
  tree.print(); 
}


main(); 





// class Event{
//   constructor(category, paid, location){
//     this.category = category;
//     this.paid = paid;
//     this.location = location; 
//   }
// }

// class Tree {
//   constructor(type, val){
//     this.catalog = {};
//     this.val = val;
//     this.type = type;
//     this.children = [];
//   }

//   addEvent(event){

//     let attributes = [
//       ["category",event.category], ["location",event.location], ["paid", event.paid]
//     ];


//     const dfs = (count=0)=> {
//       if( count===3){
//         return; 
//       }

//       console.log(count); 
//       let attribute = attributes[count];
//       console.log(attribute); 
//       if( this.catalog[val] )

//       dfs(count+1); 
//     }
  
    
//     dfs(); 

//   }
 
//   printChildren(node){

//     for(let i = 0; i<node.children.length; i++){
//       console.log( `Child${i}`, " Type:", node.children[i].type, " Value:", node.children[i].val)
//     }
//   }
// }

// function main(){
//   let events = [];
//   events[0] = new Event("Music", "true", "ONLINE");
//   events[1] = new Event("Health", "true", "ONLINE");
//   events[2] = new Event("Food & Drink", "true", "ONLINE");
//   events[3] = new Event("Music", "false", "ONLINE");
//   events[4] = new Event("Health", "false", "ONLINE");
//   events[5] = new Event("Food & Drink", "false", "ONLINE");
//   events[6] = new Event("Science & Tech", "true", "VENUE");
//   events[7] = new Event("Film & Media", "false", "VENUE");
//   events[8] = new Event("Community", "true", "VENUE");

//   let tree = new Tree(); 
//   for(let i = 0; i<1; i++){
//     tree.addEvent(events[i]);
//   }


//   tree.printChildren(tree); 
//   // tree.printChildren(tree.root.children[0]);
//   // tree.printChildren(tree.root.children[0].children[0]);
//   // tree.print(); 
// }


// main(); 




