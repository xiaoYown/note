const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

// 1. SyncHook
{
  // const hook = new SyncHook();
  // hook.tap('firstPlugin', () => console.log('SyncHook: ', 'first plugin'));
  // hook.tap('firstPlugin', () => console.log('SyncHook: ', 'first plugin +'));
  // hook.tap('secondPlugin', () => console.log('SyncHook: ', 'second plugin'));
  // hook.call();
  // hook.call();

  class Component {
    constructor (options) {
      this.props = options.props;

      this.createHook = new SyncHook(['props']);
      this.updateHook = new SyncHook(['props']);
      this.createHook.tap('create', options.create);
      this.updateHook.tap('update', options.update);
    }

    execCreate = () => {
      this.createHook.call(this.props);
    }
    execUpdate = () => {
      this.updateHook.call(this.props);
    }
    render () {
      this.execCreate(this.props);
      this.execUpdate(this.props);
    }
  }

  const component = new Component(({
    props: { a: 10 },
    create (props) {
      console.log(props);
      console.log('create hook')
    },
    update () {
      console.log('update hook')
    }
  }));
  console.log('SyncHook');
  component.render();
  console.log('\n');

  // console.log(hook.constructor)
  // console.log(hook.__proto__)
}

// {
//   class Hook {
//     constructor () {
//       this.name = 'hook'
//     }
//     origin = true
//   }
//   // 防止访问原型
//   Object.setPrototypeOf(Hook.prototype, null);
  
//   function SyncHook(args = [], name = undefined) {
//   	const hook = new Hook();
// 	  hook.constructor = SyncHook;
//   	return hook;
//   }
  
//   SyncHook.prototype = null;
  
//   var hook = new SyncHook()
  
//   console.log(hook.constructor)
//   console.log(hook.__proto__)
// }

// 2. SyncBailHook
{
  class Component {
    constructor (options) {
      this.props = options.props;

      this.createHook = new SyncBailHook(['props']);
      this.updateHook = new SyncBailHook(['props']);
      this.createHook.tap('create', options.create);
      this.updateHook.tap('update', () => {
        if (options.showUpdate()) {
          return true
        }
      });
      this.updateHook.tap('update', options.update);
    }

    execCreate = () => {
      this.createHook.call(this.props);
    }
    execUpdate = () => {
      this.updateHook.call(this.props);
    }
    render () {
      this.execCreate(this.props);
      this.execUpdate(this.props);
    }
  }

  let isChange = false;

  const component = new Component(({
    props: { a: 10 },
    create (props) {
      console.log(props);
      console.log('create hook')
    },
    update () {
      console.log('update hook')
    },
    showUpdate () {
      return !isChange
    }
  }));
  console.log('SyncBailHook');
  component.render();
  console.log('\n');
}
