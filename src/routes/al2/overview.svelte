<script>
  import * as Card from "$lib/components/ui/card"
  import * as Collapsible from "$lib/components/ui/collapsible"
  import { Button } from "$lib/components/ui/button"
  import { ChevronsUpDown, ChevronRight, Settings, Package, Factory, BarChart } from "lucide-svelte"

  import resources from '$lib/resources.json'
  import machines from '$lib/machines.json'
  import { data, list, toFix, settings } from './stores'

  // Group machines by type for better organization
  $: machineGroups = {
    'Basic Crafters': ['starter', 'crafter_mk1', 'crafter_mk2', 'crafter_mk3'],
    'Specialized': ['wire_drawer', 'cutter', 'furnace', 'cable_maker', 'hydraulic_press'],
    'Advanced': ['refinery', 'importer'],
    'Radioactive': ['radioactive_starter', 'radioactive_crafter_mk1', 'radioactive_crafter_mk2']
  }

  // Get all unique materials from the current production list
  $: allMaterials = new Set()
  $: if ($list.length > 0) {
    allMaterials.clear()
    $list.forEach(({ item }) => {
      if (resources[item] && resources[item].items) {
        Object.keys(resources[item].items).forEach(material => {
          allMaterials.add(material)
        })
      }
    })
  }

  // Calculate material requirements
  $: materialRequirements = {}
  $: if ($list.length > 0) {
    materialRequirements = {}
    $list.forEach(({ item, count }) => {
      if (resources[item] && resources[item].items) {
        Object.entries(resources[item].items).forEach(([material, reqCount]) => {
          if (!materialRequirements[material]) {
            materialRequirements[material] = 0
          }
          materialRequirements[material] += count * reqCount
        })
      }
    })
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

<div class="space-y-6">
  <!-- Machine Overview Section -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Factory size="20" />
        Machine Requirements Overview
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="space-y-4">
        {#each Object.entries(machineGroups) as [groupName, machineTypes]}
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold text-lg mb-3 text-gray-700">{groupName}</h3>
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
                        {#each Object.entries(machineData.items) as [item, { count, mcount }]}
                          <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                            <div class="flex items-center gap-2">
                              <img src={'/assets/RESOURCES_' + item.toUpperCase() + '.png'} alt={item} class="h-4" />
                              <span class="text-sm font-medium">{formatMaterialName(item)}</span>
                            </div>
                            <div class="flex items-center gap-4 text-sm">
                              <div class="text-right">
                                <span class="font-medium">{count.toFixed($toFix)}</span>
                                <span class="text-gray-500">/s required</span>
                              </div>
                              <div class="text-right">
                                <span class="font-medium">{mcount.toFixed($toFix)}</span>
                                <span class="text-gray-500">/s per machine</span>
                              </div>
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
    </Card.Content>
  </Card.Root>

  <!-- Materials Overview Section -->
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex items-center gap-2">
        <Package size="20" />
        Materials Overview
      </Card.Title>
    </Card.Header>
    <Card.Content>
      {#if Object.keys(materialRequirements).length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each Object.entries(materialRequirements) as [material, totalCount]}
            <div class="border rounded-lg p-4 hover:bg-gray-50">
              <div class="flex items-center gap-3 mb-2">
                <img src={'/assets/RESOURCES_' + material.toUpperCase() + '.png'} alt={material} class="h-6" />
                <span class="font-medium">{formatMaterialName(material)}</span>
              </div>
              <div class="text-2xl font-bold text-green-600">{totalCount.toFixed($toFix)}</div>
              <div class="text-sm text-gray-500">total units required</div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-8 text-gray-500">
          <Package size="48" class="mx-auto mb-4 text-gray-300" />
          <p>Select an item to see material requirements</p>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <!-- Production Summary -->
  {#if $list.length > 0}
    <Card.Root>
      <Card.Header>
        <Card.Title class="flex items-center gap-2">
          <BarChart size="20" />
          Production Summary
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{$list.length}</div>
            <div class="text-sm text-gray-500">Total Items</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">
              {Object.keys($data).reduce((sum, machine) => sum + $data[machine].count, 0)}
            </div>
            <div class="text-sm text-gray-500">Total Machines</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">
              {Object.keys(materialRequirements).length}
            </div>
            <div class="text-sm text-gray-500">Unique Materials</div>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  {/if}
</div>