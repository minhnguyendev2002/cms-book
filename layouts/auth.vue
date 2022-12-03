<template>
    <div class="flex justify-between h-screen">
        <div class="hidden w-7/12 md:flex items-center justify-center bg-gray-50 px-4">
            <img src="https://inkythuatso.com/uploads/images/2021/12/logo-pornhub-inkythuatso-21-15-41-06.jpg" alt="">
        </div>

        <div class="w-screen md:w-6/12 flex flex-col items-center px-4 my-4">
            <div class="flex-grow flex flex-col items-center justify-center w-[360px] max-w-[95%]">
                <img src="https://inkythuatso.com/uploads/images/2021/12/logo-pornhub-inkythuatso-21-15-41-06.jpg" class="-mt-8 w-40">
                <slot name="title" />
                <nuxt class="w-full" />
            </div>
        </div>
    </div>
</template>

<script>

    export default {
    };
</script>
