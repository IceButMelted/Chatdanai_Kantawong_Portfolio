/* ============ 3D works (EDIT THIS) ============
   Each item: { title, note, tool, src }
   - title / note: { en:"...", th:"..." }
   - tool: software used, e.g. "Blender"
   - src: image path, e.g. "assets/3d/my-model.jpg". Leave "" to show a placeholder box.
   Put the image files in assets/3d/. */
var WORKS = [
  { title:{en:"Model 01", th:"โมเดล 01"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Blender", src:"" },
  { title:{en:"Model 02", th:"โมเดล 02"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Blender", src:"" },
  { title:{en:"Model 03", th:"โมเดล 03"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Substance Painter", src:"" },
  { title:{en:"Model 04", th:"โมเดล 04"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Blender", src:"" },
  { title:{en:"Model 05", th:"โมเดล 05"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Unreal Engine", src:"" },
  { title:{en:"Model 06", th:"โมเดล 06"}, note:{en:"Short description", th:"คำอธิบายสั้นๆ"}, tool:"Blender", src:"" }
];

function renderGallery(){
  $("#gallery").innerHTML = WORKS.map(function(w){
    var pic = w.src ? '<div class="ph"><img src="'+esc(w.src)+'" alt="'+esc(w.title[lang])+'" loading="lazy"></div>'
                    : '<div class="ph"><span>'+esc(T("galHere"))+'</span></div>';
    return '<figure class="work">'+pic+'<figcaption><b>'+esc(w.title[lang])+'</b><span>'+esc(w.note[lang])+'</span><span class="chip">'+esc(w.tool)+'</span></figcaption></figure>';
  }).join("");
}
