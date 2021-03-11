<template>
  <div class="dashboard">
    <div class="project-model">
      <project-list />
      <model-list />
    </div>
    <div class="task">
      <task-list />
    </div>
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList'
import TaskList from '@/components/TaskList'
import ModelList from '@/components/ModelList'

export default {
  name: 'Dashboard',
  components: {
    ProjectList,
    TaskList,
    ModelList
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: space-between;
  .project-model{

  }
  .task{
    // margin-left: 10px;
    // height: 260px;
    // flex:auto;
  }
}
</style>
