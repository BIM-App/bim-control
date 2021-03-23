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
import ProjectList from './ProjectList'
import ModelList from './ModelList'
import TaskList from './TaskList'

export default {
  name: 'Dashboard',
  components: {
    ProjectList,
    ModelList,
    TaskList
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
