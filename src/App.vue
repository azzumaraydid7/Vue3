<template>
  <div>
    <header class="fixed bg-black text-white w-full">
      <div class="w-full px-6 mx-auto">
        <div class="py-4 flex justify-between">
          <div>
            <router-link :to="{ name: 'index'}">
              Logo
            </router-link>
          </div>
          <div>
            <router-link :to="{ name: 'home'}">
              Home
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full px-6 py-20 mx-auto">
      <div class="flex space-x-4">
        <aside class="w-52 space-y-2">
          <router-link :to="{ name: 'index'}" class="block px-4 py-2 border rounded hover:bg-gray-100 transition-colors">
            Index
          </router-link>
          <router-link :to="{ name: 'home'}" class="block px-4 py-2 border rounded hover:bg-gray-100 transition-colors">
            Home
          </router-link>
        </aside>
        <router-view></router-view>
      </div>
    </div>
    <footer class="fixed bottom-0 bg-black text-white w-full">
      <div class="w-full px-6 mx-auto">
        <div class="py-4">
          Footer
        </div>
      </div>
    </footer>
  </div>
</template>