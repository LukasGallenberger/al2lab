<script>
  import * as Collapsible from "$lib/components/ui/collapsible"
  import { Button } from "$lib/components/ui/button"
  import { ChevronsUpDown, ChevronRight } from "lucide-svelte"

  import resources from '$lib/resources.json'
  import { list, toFix } from './stores'
</script>

<div class="flex flex-col">
  {#each $list as { item, count, craft, mcount, depth }}
  <Collapsible.Root class="space-y-2">
    <div class="grid grid-cols-4">
      <div class="col-span-2 flex items-center gap-2">
        <Collapsible.Trigger asChild let:builder>
          <Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
            <ChevronsUpDown class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </Button>
        </Collapsible.Trigger>
        {#each Array(depth) as _}
        <div class="w-4 h-9 border-l border-gray-400"></div>
        {/each}
        <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
        <span class="text-sm font-semibold">{item[0].toUpperCase() + item.replaceAll('_', ' ').slice(1)}</span>
      </div>
      <div class="flex items-center justify-end gap-2">
        <span>{count.toFixed($toFix)}</span>
        <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
        <span>/s</span>
      </div>
      <div class="flex items-center justify-end gap-2">
        <span>{mcount.toFixed($toFix)}</span>
        <img src={'/assets/MACHINES_' + craft.toUpperCase() + '_TOP.png'} alt={craft} class="h-5" />
      </div>
    </div>
    <Collapsible.Content class="pb-2">
      <div class="rounded-md border text-sm p-4">
        <div class="flex flex-col gap-2">
          <div class="flex gap-3 items-center">
            {#each Object.entries(resources[item].items) as [subitem, count]}
            <div class="relative">
              <img class="h-5" src={'/assets/RESOURCES_' + subitem.toUpperCase() + '.png'} alt={subitem} />
              <div class="top-2 left-2 absolute bg-black/50 rounded-full px-1">                
                <span class="text-xs text-white">{count}</span>
              </div>
            </div>
            {/each}
            <ChevronRight />
            <img class="h-5" src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} />
            <img class="h-5" src={'/assets/MACHINES_' + craft.toUpperCase() + '_TOP.png'} alt={craft} />
          </div>
        </div>
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
  {/each}
</div>