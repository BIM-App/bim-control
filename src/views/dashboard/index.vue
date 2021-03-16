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
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 8px;
  width: 99%;
  height: 99%;
  position: absolute;
  .project-model {
    width: 70%;
    margin-right: 8px;
  }
  .task {
    width: 30%;
  }
}
</style>
