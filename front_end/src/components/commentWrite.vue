<template>
    <div class="d-flex flex-column">
      <div class="input-group input-group-sm mb-1 mt-3
        d-flex flex-row justify-content-start border-bottom border-light border-2">
      <img class="rounded-circle img-xs" src="../assets/icon.png" alt=""/>
      <div class="col-sm-6 col-md-9">
        <input class="form-control mr-sm-2 bg-light" v-model="comment"
          :maxlength="max" type="text" placeholder="Commenter..." aria-label="Commenter" id="commentText"/>
      </div>
      <label class="addImage">
   
    <span class="title-image">Ajouter image</span>
    <input accept="image/*" type="file" id="FileInput" ref="image"
      name="image_attachment_upload" v-on:change="handleFileUpload()"/>
  </label>
      <!-- add button here -->
      <AddImageButton v-on:change="handleFileUpload()"></AddImageButton>
      <!-- add button end here -->
      <div>
        <button class="btn btn-primary btn-icon-text btn-edit-profile" @click="_createComment"
          :disabled="!comment && !image">
              Publier</button>
      </div>
    </div>
    <div class="p-2 mb-3">
      <section v-if="preview">
        <img :src="preview" class="img-fluid" />
        <div class="d-flex">
          <p class="mb-0 mt-2">file name: {{ image.name }}</p>
          <button class="trash mt-1" @click="resetImage" size="2x" for="imageFile">
          </button>
        </div>
      </section>
    </div>
  </div>
</template>