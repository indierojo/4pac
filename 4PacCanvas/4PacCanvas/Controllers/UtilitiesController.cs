using System.Web.Mvc;

namespace _4PacCanvas.Controllers
{
	public class UtilitiesController : Controller
	{
		//
		// GET: /Utilities/TestSpritesheet
		public ActionResult TestSpritesheet()
		{
			return View(model: "../img/greenSheet.png");
		}
		//
		// GET: /Utilities/BouncingBalls
		public ActionResult BouncingBalls()
		{
			return View();
		}
		//
		// GET: /Utilities/KeyboardMovement
		public ActionResult KeyboardMovement()
		{
			return View();
		}

		public ActionResult AnimationFrame()
		{
			return View();
		}
	}
}