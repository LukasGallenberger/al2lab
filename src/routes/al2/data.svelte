<script>
  import * as Collapsible from "$lib/components/ui/collapsible"
  import { Button } from "$lib/components/ui/button"
  import { ChevronsUpDown, ChevronRight } from "lucide-svelte"

  import resources from '$lib/resources.json'
  import { data, toFix } from './stores'
</script>

<div class="flex flex-col">
  {#each Object.entries($data) as [machine, { count, items }]}
  <div class="grid grid-cols-4">
    <div class="col-span-2 flex items-center gap-2 h-9">
      <img src={'/assets/MACHINES_' + machine.toUpperCase() + '_TOP.png'} alt={machine} class="h-5" />
      <span class="text-sm font-semibold">{machine[0].toUpperCase() + machine.replaceAll('_', ' ').slice(1)}</span>
    </div>
    <div class="flex items-center justify-end gap-2">

    </div>
    <div class="flex items-center justify-end gap-2">
      <span>{count}</span>
      <img src={'/assets/MACHINES_' + machine.toUpperCase() + '_TOP.png'} alt={machine} class="h-5" />
    </div>
  </div>
  {#each Object.entries(items) as [ item, { count, mcount }]}
  <div class="grid grid-cols-4">
    <div class="col-span-2 flex items-center gap-2">
      <div class="w-4 h-9"></div>
      <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
      <span class="text-sm font-semibold">{item[0].toUpperCase() + item.replaceAll('_', ' ').slice(1)}</span>
    </div>
    <div class="flex items-center justify-end gap-2">
      <span>{count.toFixed($toFix)}</span>
      <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
    </div>
    <div class="flex items-center justify-end gap-2">
      <span>{mcount.toFixed($toFix)}</span>
      <img src={'/assets/MACHINES_' + machine.toUpperCase() + '_TOP.png'} alt={machine} class="h-5" />    </div>
  </div>
  {/each}
  {/each}
</div>