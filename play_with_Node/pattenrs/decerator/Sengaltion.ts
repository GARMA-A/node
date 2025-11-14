class Sengliation {
	private static objRef: Sengliation | null = null;
	private constructor() { }

	public static getInstance(): Sengliation {
		if (!Sengliation.objRef) {
			Sengliation.objRef = new Sengliation();
		}
		return Sengliation.objRef;
	}

}
const myobj = Sengliation.getInstance()



