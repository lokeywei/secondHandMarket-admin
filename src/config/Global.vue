<script type="es6">
  const serverPath = 'http://localhost:8081';
  const getUserApplicationList = serverPath + "/manageuser/getUserApplicationList";
  const changeUser = serverPath + "/manageuser/changeUser";
  const deleteUser = serverPath + "/manageuser/deleteUser";
  const getUserList = serverPath + "/manageuser/getUserList";
  const getGoodsApplicationList = serverPath + "/managegoods/getGoodsApplicationList";
  const getGoodsList = serverPath + "/managegoods/getGoodsList";
  const changeGoods = serverPath + "/managegoods/changeGoods";
  const deleteGoods = serverPath + "/managegoods/deleteGoods";
  const getGoodsCateList = serverPath + "/managegoods/getGoodsCateList";
  const changeGoodsCate = serverPath + "/managegoods/changeGoodsCate";
  export default {
      getUserApplicationList,
      changeUser,
      deleteUser,
      getUserList,
      getGoodsApplicationList,
      changeGoods,
      deleteGoods,
      getGoodsCateList,
      changeGoodsCate,
      getGoodsList
  }
</script>
