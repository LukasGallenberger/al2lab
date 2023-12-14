import { writable, get, derived, readable } from 'svelte/store'
import resources from '$lib/resources.json'
import machines from '$lib/machines.json'

export const objective = writable({ item: '', count: 1 })
export const settings = writable(Object.fromEntries(Object.keys(machines).map((key) => [key, [0]])))

export const toFix = derived([objective], ([{ _, count }]) => {
  return count % 1 === 0 ? 2 : count.toString().split('.')[1].length + 2
})

const expand = (item, count, depth = 0) => {
  let list = [{
    item: item,
    count: count,
    craft: resources[item].craft,
    mcount: count * machines[resources[item].craft].speed[get(settings)[resources[item].craft]],
    depth: depth
  }]
  if(resources[item]){
    for(const property in resources[item].items){
      list = [
        ...list,
        ...expand(property, count * resources[item].items[property], depth + 1)
      ]
    }
  }
  return list
}

const compile = (data) => {
  let list = {}
  for(let { item, count, craft, mcount, depth } of data){
    list[craft] = { count: 0, items: {}}
  }
  for(let { item, count, craft, mcount, depth } of data){
    list[craft].items = {...list[craft].items, [item]: { count: 0, mcount: 0 } }
  }
  for(let { item, count, craft, mcount, depth } of data){
    list[craft].items[item].count += count
    list[craft].items[item].mcount += mcount
  }
  for(let craft in list){
    for(let item in list[craft].items){
      list[craft].count += Math.ceil(list[craft].items[item].mcount)
    }
  }
  return list
}

export const list = derived([objective, settings], ([{ item, count }, _]) => {
  return item ? expand(item, Number(count)) : []
})

export const data = derived([list], ([list]) => {
  return compile(list)
})