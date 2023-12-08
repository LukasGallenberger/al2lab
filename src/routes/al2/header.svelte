<script>
  import { Button } from "$lib/components/ui/button"
  import { Github } from 'lucide-svelte'
</script> 

<div class="border-b flex h-16 items-center px-4">
  <div class="flex items-center gap-3">
    <img class="h-8" src="/icon.png" alt="icon" />
    <span class="text-lg">Assembly Line 2</span>      
  </div>
  <div class="ml-auto flex items-center space-x-4">
    <Button variant="outline" class="flex gap-2" href="https://github.com/Joshimello/AL2Lab" target="_blank">
      <Github size="16" />
      Source
    </Button>
  </div>
</div>