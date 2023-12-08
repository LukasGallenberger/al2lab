<script>
  import resources from '$lib/resources.json'
  import * as Dialog from "$lib/components/ui/dialog"
  import * as Card from "$lib/components/ui/card"
  import { Input } from "$lib/components/ui/input"
  import { Button } from "$lib/components/ui/button"
  import * as HoverCard from "$lib/components/ui/hover-card"
  import * as Select from "$lib/components/ui/select"
  import { ChevronRight } from "lucide-svelte"

  import { objective } from './stores'

  let open = false
  let search = ''
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Objective</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex gap-2">
      <Dialog.Root bind:open={open}>
        <Dialog.Trigger>
          <Button variant="outline" class="w-max">
            <div class="flex gap-3">
              {#if $objective.item}
              <img src={'/assets/RESOURCES_' + $objective.item.toUpperCase() + '.png'} alt={$objective.item} class="h-5" />
              {$objective.item[0].toUpperCase() + $objective.item.replaceAll('_', ' ').slice(1)}
              {:else}
              Select item
              {/if}
            </div>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Select an item</Dialog.Title>
          </Dialog.Header>
          <Input placeholder="Search..." bind:value={search} />
          <div class="grid grid-cols-12">
            {#each Object.entries(resources).filter(i => i[0].includes(search)) as [name, { items, craft }]}
            <HoverCard.Root openDelay={100}>
              <HoverCard.Trigger>
                <Button variant="ghost" size="icon" on:click={() => {
                  $objective.item = name
                  open = false
                }}>
                  <img src={'/assets/RESOURCES_' + name.toUpperCase() + '.png'} alt={name} />
                </Button>
              </HoverCard.Trigger>
              <HoverCard.Content class="w-max">
                <div class="flex flex-col gap-2">
                  <span>{name[0].toUpperCase() + name.replaceAll('_', ' ').slice(1)}</span>
                  <div class="flex gap-2 items-center">
                    {#each Object.entries(items) as [item, count]}
                    <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} />
                    {/each}
                    <ChevronRight />
                    <img src={'/assets/RESOURCES_' + name.toUpperCase() + '.png'} alt={name} />
                  </div>
                  <span>Producer</span>
                  <div>
                    <img src={'/assets/MACHINES_' + craft.toUpperCase() + '_TOP.png'} alt={craft} />
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>
            {/each}
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Input type="number" bind:value={$objective.count} />
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="items/s"/>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="items/s">Items/s</Select.Item>
          <Select.Item value="items/m" disabled>Items/m</Select.Item>
          <Select.Item value="test" disabled>🚧 UNDER CONSTRUCTION 🚧</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </Card.Content>
</Card.Root>