<template>
    <header class="bg-primaryBlue ">
        <div class="flex flex-col lg:flex-row lg:max-w-7xl mx-auto items-center">
            <div class="mt-2 mb-4">
                <img class="lg:w-3/6" src="../assets/unach.jpg" alt="Logo unach 2023">
            </div>
            <!-- <div class="flex flex-col items-center justify-center mb-5">
                <div class="font-bold text-white">
                    <a href="#" class="mx-1">Spanish |</a>
                    <a href="#" class="mx-1">English |</a>
                    <a href="#" class="mx-1">French</a>
                </div>
                <div class="text-white text-lg font-bold">
                    <a href="#" class="mx-2">Loho</a>
                    <a href="#" class="mx-2">Loto</a>
                    <a href="#" class="mx-2">Logo</a>
                </div>
            </div>         -->
        </div>
    </header>
    <nav class="bg-SecundaryGold shadow-lg">
        <div class="p-1 md:p-4 xl:pl-0 lg:max-w-7xl mx-auto lg:flex lg:items-center">
            <div class="flex justify-end">
                <span class="cursor-pointer md:hidden block m-2 mt-3 text-white text-3xl">
                    <i class="pi pi-bars" onclick="Menu()"></i>
                </span>
            </div>

            <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-SecundaryGold w-full left-0 md:w-auto md:py-0 py-4 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio</a>
                </li>
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio2</a>
                </li>
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio31</a>
                </li>
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio422</a>
                </li>
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio54</a>
                </li>
                <li class="mx-4 my-5 md:my-0">
                    <a href="#" class=" text-xl text-white font-bold">Inicio666</a>
                </li>
            </ul>
        </div>
    </nav>

</template>
