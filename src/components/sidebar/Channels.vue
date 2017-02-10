

<template>

<div class="channels_container">
    <h2 class="ui inverted center aligned header">channels<i class="add square icon add_channels"></h2>
    <div class="ui raised padded segment channels_list">
        <ul><li>Vue js</li></ul>
    </div>
</div>


</template>

<script>

export default {
    name: 'channels'
}

</script>

<style scope>
.channels_list{
    min-height: 100px;
    max-height: 300px!important;
    overflow-y: auto!important;
}
.channels_container ul{
    margin: 0;
    padding: 0;
}
.channels_item{
    height: 20px;
    margin: 8px;
    list-style: none;
    background-color: #ca67ff;
    cursor: pointer;
    line-height: 30px;
    border-radius: 2px;
    padding-left: 12px;
    font-weight: bold;
    font-size: 1.1em;
}
.channels_count{
    float: right;
}
.is_active{
    background-color: #9740c5;
}
.add_channels{
    cursor: pointer;
    color: #8BC34A;
}
.add_channels.hover{
    color: #689F38;
}

    
</style>
