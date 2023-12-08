<script>
  import Header from './header.svelte'
  import Settings from './settings.svelte'
  import Objective from './objective.svelte'
  import Factory from './factory.svelte'
</script>

<Header/>
<div class="grid grid-cols-4">
  <div class="flex flex-col p-8 pr-0">
    <Settings/>
  </div>
  <div class="col-span-3 flex flex-col p-8 gap-4">
    <Objective/>
    <Factory/>
  </div>  
</div>
