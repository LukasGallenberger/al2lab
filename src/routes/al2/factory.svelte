<script>
  import * as Card from "$lib/components/ui/card"
  import * as Tabs from "$lib/components/ui/tabs"
  import { ListTree, Workflow, Database } from "lucide-svelte"

  import List from './list.svelte'
  import Data from './data.svelte'
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Factory</Card.Title>
  </Card.Header>
  <Card.Content>
    <Tabs.Root value="list">
      <Tabs.List>
        <Tabs.Trigger value="list" class="flex gap-2">
          <ListTree size="16"/> List
        </Tabs.Trigger>
        <Tabs.Trigger value="flow" class="flex gap-2">
          <Workflow size="16"/> Flow
        </Tabs.Trigger>
        <Tabs.Trigger value="data" class="flex gap-2">
          <Database size="16"/> Data
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="list">
        <List/>
      </Tabs.Content>
      <Tabs.Content value="flow">
        🚧 UNDER CONSTRUCTION 🚧
      </Tabs.Content>
      <Tabs.Content value="data">
        <Data/>
      </Tabs.Content>
    </Tabs.Root>
  </Card.Content>
</Card.Root>