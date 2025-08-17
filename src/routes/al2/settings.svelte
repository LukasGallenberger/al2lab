<script>
  import * as Accordion from "$lib/components/ui/accordion" 
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { Slider } from "$lib/components/ui/slider"
  import { Settings, Zap } from "lucide-svelte"

  import machines from '$lib/machines.json'
  import { settings } from './stores'

  // Group machines by type for better organization
  const machineGroups = {
    'Basic Crafters': ['starter', 'crafter_mk1', 'crafter_mk2', 'crafter_mk3'],
    'Specialized': ['wire_drawer', 'cutter', 'furnace', 'cable_maker', 'hydraulic_press'],
    'Advanced': ['refinery', 'importer'],
    'Radioactive': ['radioactive_starter', 'radioactive_crafter_mk1', 'radioactive_crafter_mk2']
  }

  // Format machine name for display
  function formatMachineName(name) {
    return name[0].toUpperCase() + name.replaceAll('_', ' ').slice(1)
  }

  // Get current speed value
  function getCurrentSpeed(machine) {
    const currentIndex = $settings[machine][0]
    return machines[machine].speed[currentIndex]
  }
</script>

<Accordion.Root multiple={true} value={['factory']}>
  <Accordion.Item value="factory">
    <Accordion.Trigger class="flex items-center gap-2">
      <Settings size="16" />
      Factory Configuration
    </Accordion.Trigger>
    <Accordion.Content>
      <div class="space-y-4 py-2 pr-4">
        {#each Object.entries(machineGroups) as [groupName, machineTypes]}
          <div class="border rounded-lg p-3">
            <h3 class="font-semibold text-sm mb-3 text-gray-700">{groupName}</h3>
            <div class="space-y-3">
              {#each machineTypes as machine}
                <div class="flex gap-3 items-center p-2 bg-gray-50 rounded">
                  <Tooltip.Root>
                    <Tooltip.Trigger class="w-8">
                      <img src={'/assets/MACHINES_' + machine.toUpperCase() + '_TOP.png'} alt={machine} class="h-5" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      {formatMachineName(machine)}
                    </Tooltip.Content>
                  </Tooltip.Root>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-sm font-medium">{formatMachineName(machine)}</span>
                      <div class="flex items-center gap-1 text-xs text-gray-600">
                        <Zap size="12" />
                        <span>{getCurrentSpeed(machine).toFixed(2)}x</span>
                      </div>
                    </div>
                    <Slider 
                      max={machines[machine].speed.length - 1} 
                      min={0} 
                      step={1} 
                      bind:value={$settings[machine]}
                      class="w-full"
                    />
                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{machines[machine].speed[0].toFixed(2)}x</span>
                      <span>{machines[machine].speed[machines[machine].speed.length - 1].toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="display">
    <Accordion.Trigger>Display</Accordion.Trigger>
    <Accordion.Content>
      🚧 UNDER CONSTRUCTION 🚧
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="flow">
    <Accordion.Trigger>Flow</Accordion.Trigger>
    <Accordion.Content>
      🚧 UNDER CONSTRUCTION 🚧
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="advanced">
    <Accordion.Trigger>Advanced</Accordion.Trigger>
    <Accordion.Content>
      🚧 UNDER CONSTRUCTION 🚧
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
