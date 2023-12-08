<script>
  import * as Sheet from "$lib/components/ui/sheet"
  import { Button } from "$lib/components/ui/button"

  import Header from './header.svelte'
  import Settings from './settings.svelte'
  import Objective from './objective.svelte'
  import Factory from './factory.svelte'
</script>

<Header/>
<div class="grid grid-cols-4">
  <div class="flex flex-col p-8 pr-0 hidden lg:block">
    <Settings/>
  </div>
  <div class="lg:col-span-3 col-span-4 flex flex-col p-8 gap-4">
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="lg:hidden">Settings</Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <Settings/>
      </Sheet.Content>
    </Sheet.Root>
    <Objective/>
    <Factory/>
  </div>  
</div>
