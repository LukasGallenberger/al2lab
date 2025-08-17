<script>
  import * as Collapsible from "$lib/components/ui/collapsible"
  import { Button } from "$lib/components/ui/button"
  import { ChevronsUpDown, ChevronRight, Settings, BarChart } from "lucide-svelte"

  import resources from '$lib/resources.json'
  import { data, toFix, settings } from './stores'

  // Group machines by type for better organization
  $: machineGroups = {
    'Basic Crafters': ['starter', 'crafter_mk1', 'crafter_mk2', 'crafter_mk3'],
    'Specialized': ['wire_drawer', 'cutter', 'furnace', 'cable_maker', 'hydraulic_press'],
    'Advanced': ['refinery', 'importer'],
    'Radioactive': ['radioactive_starter', 'radioactive_crafter_mk1', 'radioactive_crafter_mk2']
  }

  // Get machine speed configuration
  function getMachineSpeed(machineType) {
    const currentSettings = $settings[machineType]
    if (currentSettings && currentSettings.length > 0) {
      return currentSettings[0]
    }
    return 1
  }

  // Format machine name for display
  function formatMachineName(name) {
    return name[0].toUpperCase() + name.replaceAll('_', ' ').slice(1)
  }

  // Format material name for display
  function formatMaterialName(name) {
    return name[0].toUpperCase() + name.replaceAll('_', ' ').slice(1)
  }
</script>

<div class="space-y-4">
  {#each Object.entries(machineGroups) as [groupName, machineTypes]}
    <div class="border rounded-lg p-4">
      <h3 class="font-semibold text-lg mb-3 text-gray-700 flex items-center gap-2">
        <BarChart size="20" />
        {groupName}
      </h3>
      <div class="space-y-3">
        {#each machineTypes as machineType}
          {#if $data[machineType]}
            {@const machineData = $data[machineType]}
            {@const currentSpeed = getMachineSpeed(machineType)}
            <Collapsible.Root class="border rounded-md">
              <div class="flex items-center justify-between p-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <img src={'/assets/MACHINES_' + machineType.toUpperCase() + '_TOP.png'} alt={machineType} class="h-6" />
                  <div>
                    <span class="font-medium">{formatMachineName(machineType)}</span>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <Settings size="14" />
                      <span>Speed: {currentSpeed}x</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <div class="text-lg font-bold text-blue-600">{machineData.count}</div>
                    <div class="text-sm text-gray-500">machines needed</div>
                  </div>
                  <Collapsible.Trigger asChild let:builder>
                    <Button builders={[builder]} variant="ghost" size="sm">
                      <ChevronsUpDown class="h-4 w-4" />
                    </Button>
                  </Collapsible.Trigger>
                </div>
              </div>
              <Collapsible.Content class="px-3 pb-3">
                <div class="space-y-2">
                  {#each Object.entries(machineData.items) as [ item, { count, mcount }]}
                    <div class="grid grid-cols-4 items-center py-2 px-3 bg-gray-50 rounded">
                      <div class="col-span-2 flex items-center gap-2">
                        <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
                        <span class="text-sm font-semibold">{formatMaterialName(item)}</span>
                      </div>
                      <div class="flex items-center justify-end gap-2">
                        <span class="font-medium">{count.toFixed($toFix)}</span>
                        <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-5" />
                        <span class="text-gray-500">/s</span>
                      </div>
                      <div class="flex items-center justify-end gap-2">
                        <span class="font-medium">{mcount.toFixed($toFix)}</span>
                        <img src={'/assets/MACHINES_' + machineType.toUpperCase() + '_TOP.png'} alt={machineType} class="h-5" />
                        <span class="text-gray-500">/s</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>