package models

type Data struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Url   string `json:"url"`
	Image string `json:"image"`
}

type Informasi struct {
	ID         int64  `json:"id"`
	Judul      string `json:"judul"`
	Keterangan string `json:"keterangan"`
	Data       []Data `json:"data"`
}

var InformasiData = []Informasi{
	{
		ID:         1,
		Judul:      "Bootcamp",
		Keterangan: "Banyak Platform website ataupun aplikasi yang menyediakan pembelajaran forum diskusi, tryout, bootcamp, dan lainya. namun, banyak juga para siswa yang masih awam yang tidak mengetahui platform apa saja yang dapat membantu mereka dalam persiapan test masuk perguruan tinngi. Berikut adalah beberapa platform yang dapat membantu kamu dalam persiapan test masuk perguruan tinggi.",
		Data: []Data{
			{
				ID:    1,
				Name:  "bimbingan-ui",
				Url:   "https://bimbingan-ui.com/",
				Image: "https://bimbinganalumniui.com/assets/upload/image/Logo_Bimbingan_Alumni_UI.png",
			},
		},
	},
	{
		ID:    2,
		Judul: "Belajar",
		Data: []Data{
			{
				ID:    1,
				Name:  "Zenius",
				Url:   "https://www.ruangguru.com/",
				Image: "https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2021/09/07/lowongan-kerja-startup-ruangguru-20210907021057.jpg",
			},
			{
				ID:    2,
				Name:  "Pahamify",
				Url:   "https://www.pahamify.com/",
				Image: "https://statik.tempo.co/data/2022/06/29/id_1121359/1121359_720.jpg",
			},
			{
				ID:    3,
				Name:  "Ruangguru",
				Url:   "https://www.ruangguru.com/",
				Image: "https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2021/09/07/lowongan-kerja-startup-ruangguru-20210907021057.jpg",
			},
			{
				ID:    4,
				Name:  "Quipper",
				Url:   "https://www.quipper.com/",
				Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwQgmPkp0cTAnDatiGFyeYrtwqf4iIKM42w&usqp=CAU",
			},
		},
	},
	{
		ID:    3,
		Judul: "Forum",
		Data: []Data{
			{
				ID:    1,
				Name:  "Brainly",
				Url:   "https://brainly.co.id/",
				Image: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/9b/ae/33/9bae337f-4754-5086-bbe6-c27538e83b06/BrainlyAppIcon-0-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png",
			},
		},
	},
	{
		ID:    4,
		Judul: "Tryout",
		Data: []Data{
			{
				ID:    1,
				Name:  "Eduka",
				Url:   "https://eduka.id/",
				Image: "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/4794cbe1768a7fce2614f2c281d133b3.png",
			},
		},
	},
}
