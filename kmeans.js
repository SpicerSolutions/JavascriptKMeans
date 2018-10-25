/*! K-Means Algorithm v2 | (c) 2015, 2015 Jonathan Spicer */
function kmeans( arrayToProcess, centroids, clusters )
{	
	
	Groups=Array();
	iterations=0;
	
	function getType(o)
	{
		var _t;
		return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
	}
	
	function deepCopy(target,source)
	{
		for(var p in source)
		{
			if(getType(source[p])=="array"||getType(source[p])=="object")
			{
				target[p]=getType(source[p])=="array"?[]:{};
				arguments.callee(target[p],source[p]);
			}
			else
			{
				target[p]=source[p];
			}
		}
	}						
	
	tempdistance=0;
	oldcentroids=[];
	deepCopy( oldcentroids, centroids );
	
	do
	{	

		for( reset=0; reset < clusters; reset++ )
		{

			Groups[reset]=Array();

		}
		
		changed=false;
		
		for( i=0; i < arrayToProcess.length; i++)
		{	  

			lowdistance=-1;
			lowclusters=0;	

			for( clustersloop=0; clustersloop < clusters; clustersloop++ )
			{	    

				dist=0;	  

				for( j=0;  j < arrayToProcess[i].length; j++ )
				{

					dist+=Math.pow( Math.abs( arrayToProcess[i][j] - centroids[clustersloop][j] ), 2 );

				}

				tempdistance=Math.sqrt( dist );

				if ( lowdistance==-1 )
				{

					lowdistance=tempdistance;
					lowclusters=clustersloop;

				}
				else if ( tempdistance <= lowdistance )
				{

					lowclusters=clustersloop;
					lowdistance=tempdistance;

				}

			}

			Groups[lowclusters].push( arrayToProcess[i].slice() );  

		}

		for( clustersloop=0; clustersloop < clusters; clustersloop++)
		{

			for( i=0, totalGroups=Groups[clustersloop].length; i < totalGroups; i++ )
			{

				for( j=0, totalGroupsSize=Groups[clustersloop][i].length; j < totalGroupsSize; j++ )
				{
				  
					centroids[clustersloop][j]+=Groups[clustersloop][i][j]

				}
					
			}

			for( i=0; i < centroids[clustersloop].length; i++ )
			{

				centroids[clustersloop][i]=( centroids[clustersloop][i]/Groups[clustersloop].length );

				if ( centroids[clustersloop][i]!=oldcentroids[clustersloop][i] )
				{

					changed=true;
					oldcentroids=[];
					deepCopy( oldcentroids, centroids );

				}

			}
		
		}
		
		iterations++;
		
	}
	while(changed==true);

	return Groups;
	
}