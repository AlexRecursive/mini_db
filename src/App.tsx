import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'styles/common.scss';
import { ReactComponent as Close } from 'images/close.svg';
import _ from 'lodash';
import { IItems, itemsDefault } from 'data';

function App() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [mounted, setMounted] = useState<boolean>(false);
  const [items, setItems] = useState<IItems[]>(itemsDefault);
  const [newCounter, setNewCounter] = useState<number>(1);

  const onDelete = (i: number) => {   
    setItems(_.reject(items, (item, index) => { 
      return i === index 
    }))
  }

  useEffect(()=>{
    const dashboard = localStorage.getItem('dashboard');
    if(dashboard) {
      setItems(JSON.parse(dashboard).layout);
      setNewCounter(JSON.parse(dashboard).counter);
    }
    setMounted(true)
  }, [])

  useEffect(()=>{
    mounted && localStorage.setItem('dashboard', JSON.stringify({
      layout: items,
      counter: newCounter
    }))
  }, [items, mounted, newCounter])

  const onAdd = () => {   
    setItems(items.concat([
      {
        i: `Other ${newCounter}`,
        x: 0, 
        y: 0, 
        w: 1, 
        h: 1
      }
    ]))
    setNewCounter(newCounter + 1);
  }

  const onChange = (layout: IItems[]) => {   
    setItems(layout)
  }

  return (
    <div className="App">
      <h1>📊 Mini Dashboard</h1>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 800, md: 500, sm: 400, xs: 300, xxs: 0 }}
        rowHeight={120}
        cols={{ lg: 10, md: 6, sm: 4, xs: 2, xxs: 2 }}
        useCSSTransforms={false}
        onDragStop={onChange}
        onResizeStop={onChange}
        measureBeforeMount={true}
        draggableCancel=".react-grid-item-delete"
      >
        {items.map((item, key)=>{
          return item.i === 'add' ? (
                <div key={item.i} onClick={()=>onAdd()} className='react-grid-item-add' data-grid={{...item}}><span>+</span></div>
              ) : (
                <div key={item.i} data-grid={{...item}}>
                  {item.i}
                  <span className='react-grid-item-delete' onClick={()=>onDelete(key)}><Close /></span>
                </div>
              )
        })}
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
