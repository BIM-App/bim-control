<template>
  <div class="container">
    <section>
      施工单位
    </section>
    <section>
      监理单位
    </section>
    <section>
      业主单位
    </section>
  </div>
</template>

<script>
import { findParticipantApi } from '@/api/participant'
import { getProjectPID } from '@/utils/cookie'
export default {
  data() {
    return {

    }
  },
  created() {
    findParticipantApi(getProjectPID()).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 40px;
  display: flex;
  justify-content: space-around;
  section {
    margin: 40px;
    background-color: lightgreen;
  }
}
</style>
