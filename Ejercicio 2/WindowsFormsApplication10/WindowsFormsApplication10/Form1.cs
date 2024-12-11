using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication10
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Imagenes JPG|*.jpg|Imagenes PNG|*.png";
            openFileDialog1.ShowDialog();
            Bitmap bmp = new Bitmap(openFileDialog1.FileName);
            pictureBox1.Image = bmp;

            Color c = new Color();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Bitmap bmp = new Bitmap(pictureBox1.Image);
            Color c = new Color();
            c = bmp.GetPixel(10, 10); //Pixel de la fila 10 columna 10
            textBox1.Text = c.R.ToString();
            textBox2.Text = c.G.ToString();
            textBox3.Text = c.B.ToString();


        }

        private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
        {
            /*
            Bitmap bmp = new Bitmap(pictureBox1.Image);
            Color c = new Color();
            c = bmp.GetPixel(e.X, e.Y); //Mediante el click del mouse
            textBox1.Text = c.R.ToString();
            textBox2.Text = c.G.ToString();
            textBox3.Text = c.B.ToString();*/

            int R, G, B;
            Bitmap bmp = new Bitmap(pictureBox1.Image);
            Color c = new Color();
            c = bmp.GetPixel(e.X, e.Y); //Mediante el click del mouse
            R = c.R;
            G = c.G;
            B = c.B;

            Bitmap bmp2 = new Bitmap(bmp.Width, bmp.Height);
            for( int i = 0; i < bmp.Width; i++)
                for (int j = 0; j < bmp.Height; j++)
                {
                    c = bmp.GetPixel(i,j);
                    if ((R - 10 < c.R && c.R < R + 10) && (G - 10 < c.G && c.G < G + 10) && (B - 10 < c.B && c.B < B + 10))
                        bmp2.SetPixel(i, j, Color.Red);
                    else
                        bmp2.SetPixel(i,j, Color.FromArgb(c.R, c.G, c.B));
                }
            pictureBox2.Image = bmp2;
        }

    }
}
